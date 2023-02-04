import React ,{useEffect, useState} from 'react';
import "./style.css";

const getLocalData=()=>{
  const lists=localStorage.getItem("mytodolist");

  if(lists)
  {
    return JSON.parse(lists);
  }else{
    return [];
  }
};
const Todolist = () => {
    const [inputdata, setInputData]= useState("");
    const [items , setItems]=useState(getLocalData());
    const [isEditItem,setIdIem]=useState("");
    const [toggleButton,setToggle]=useState(false);

    const addItem = () =>{
        if(!inputdata) {
            alert("please fill the  data");
         }else if(inputdata && toggleButton)
         {
            setItems(
                items.map((curElem) => {
                    if(curElem.id===isEditItem){
                        return {...curElem, name: inputdata};
                    }
                    return curElem;
                })
            );
        setInputData("");
        setIdIem(null);
        setToggle(false);
         }
         
         
         else{
            const myNewInputData={
                id: new Date().getTime().toString(),
                name : inputdata,
            };
            setItems([...items,myNewInputData]);
            setInputData("");
         }
        //  console.log(items);
    };

    const editItems=(index)=>{
        const item_todo_edited = items.find((curElem)=>{
            return curElem.id===index;
        });
        setInputData(item_todo_edited.name);
        setIdIem(index);
        setToggle(true);
    };
    
    const deleteItem=(index)=>{
        const updateItem =items.filter((curElem)=>{
            return curElem.id!==index;
        });
        setItems(updateItem);
    };

    const removeAll=()=>{
        setItems([]);
    };
    
    const showAll=()=>{
        
    };

    useEffect(()=>{
        localStorage.setItem("mytodolist",JSON.stringify(items));
    },[items]);

    return(
        <>
        <center>
        <div className="main-div">
            <div className="child-div">
                <figure>
                   <img src="./images/i.webp" alt="todologo" /> 
                   <figcaption>Add Your List Here</figcaption>
                </figure>
                <div className="addItems">
                    <input type="text" placeholder='Add Items.....' className='form-control'
                    value={inputdata}
                    onChange={(event) => setInputData(event.target.value)}/>
                    {
                      toggleButton ?  (
                        <i className="fa fa-edit add-btn" onClick={addItem}></i>) :
                         ( <i className="fa fa-plus add-btn" onClick={addItem}></i>)
                       
                    }
                    
                   
                </div>
                <div>
                    {
                        <div className="showItems" onClick={()=>showAll()}>
                            {items.map((curElem)=>{
                                return(
                                    <div className="eachItem" key={curElem.id}>
                                    <h3>{curElem.name}</h3>
                                    {/* <h5>{curElem.id}</h5> */}
                                    <div className="todo-btn">
                                    <i className="far fa-edit add-btn"
                                    onClick={()=>editItems(curElem.id)}></i>
                                    <i className="far fa-trash-alt add-btn" 
                                    onClick={()=>deleteItem(curElem.id)}></i>
                                    </div>
                                    
                                    </div>       
                                );
                            })}
                          
                            
                             
                        </div>
                    }
                </div>
                <div className="showItems">
                    <button className="btn" data-sm-link-text="Remove All" onClick={showAll}>
                      <span>  <b>CHECK LIST</b></span>
                    </button>&nbsp;&nbsp;
                    <button className="btn" data-sm-link-text="Remove All" onClick={removeAll}><span> <b>REMOVE ALL</b> </span></button>
                </div>
            </div>
        </div>
        </center>
        </>
    )
};
export  default Todolist ;
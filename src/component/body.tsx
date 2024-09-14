import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from 'primereact/paginator';
import React from "react";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function Body() {
  const [items, setItems] = React.useState([]);
  const [show,setShow] = React.useState(false)
  const [num,setNum] = React.useState(0)
  const [list,setList] = React.useState([1])
  const [first, setFirst] = React.useState(0);
  const [pageNum,setPageNum] = React.useState(1)
  const [selectedProducts, setSelectedProducts]:[any,any] = React.useState(null);

  React.useEffect(() => {
    fetchData();
  }, [pageNum]);
  
  React.useEffect(()=>{
    if(!list.includes(pageNum)){
      setList(pre=>[...pre,pageNum])
      showNumber()
    }
  },[items])

  async function fetchData() {
    let result:any = await fetch("https://api.artic.edu/api/v1/artworks?page="+pageNum);
    result = await result.json();
    setItems(result.data);
  }

  function selecting(e:any) {
    setSelectedProducts(e.value);
  }
  
   function handleRowClick(e:any){
      const id = e.data['id']
      
      for(let i=0;i<items.length;i++){
        if(items[i]['id']==id){
          const selectedRows = [...items].splice(0,1); // Select first 'n' rows
          console.log('selected',selectedProducts)
          setSelectedProducts(selectedRows);
        }
      }
      
   }

    const onPageChange = (event:any) => {
        setFirst(event.first);
        setPageNum(event['page']+1)
    };
    function showNumber(){
      const digit = num-12*(pageNum-1)
      // console.log('showing')
      if(digit>0){
        const selectedRows = items.slice(0, digit); 
        setSelectedProducts((pre:any)=>{
            if(pre!==null){
              return [...pre,...selectedRows];

            }else{
              return selectedRows
            }
          }
        )
        console.log('selectedRows',selectedRows)
      setShow(false)
      }
    } 

    function handleHeaderClick(){
      setShow(pre=>!pre)
    }

    const idHeaderTemplate = () => {
      return (
          <div
              style={{ cursor: 'pointer', color: 'black' }}
              onClick={() => handleHeaderClick()}
          >
              ⌄
          </div>
      );
  };
  return (
    <div style={{position:'relative'}}>
      <DataTable
        value={items}
        onRowClick={handleRowClick}
        rows={12}
        scrollable
        scrollHeight="500px" 
        selection={selectedProducts}
        onSelectionChange={(e) => selecting(e)}
        style={{ border: "solid grey 1px",width:'1200px' }}
      >
        <Column selectionMode="multiple" headerStyle={{ width: "4em" }} style={{ width: '3%' }}/>
        <Column header={idHeaderTemplate()} style={{ cursor: "pointer",width: '2%' }}/>
        <Column field="title" header="title" style={{ width: '22%' }}/>
        <Column field="place_of_origin" header="place of origin" style={{ width: '16%' }}/>
        <Column field="artist_display" header="artist display" style={{ width: '32%' }}/>
        <Column field="date_start" header="date start" style={{ width: '10%' }}/>
        <Column field="date_end" header="date end" style={{ width: '10%' }}/>
      </DataTable>
      <Paginator first={first} rows={12} totalRecords={60} onPageChange={onPageChange} style={{outline:"none"}}/>
      {show&&<div style={{display:'flex',gap:'1rem',flexDirection:'column',boxShadow:'0px 0px 7px -3px',position:'absolute',top:"3rem",left:"4.5rem",zIndex:'1',background:'white',padding:'10px 15px',borderRadius:'10px'}}>
        <input style={{width:"7rem"}} type="text" value={num} onChange={(e:any)=>setNum(e.target.value)} placeholder="Enter no. of rows" autoComplete="off"/>
        <button onClick={showNumber}>submit</button>
      </div>}
    </div>
  );
}

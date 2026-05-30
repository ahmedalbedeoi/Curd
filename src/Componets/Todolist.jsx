import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Divider from '@mui/material/Divider';
import Todo from './Todo';
import {Grid} from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect, useState } from 'react';
import { Todocontext } from '../Context/contex';

export default function Todolist() {
const [title,setTitle]=useState("")
const [des,setdes]=useState("")

const {todoD,settodoD}=useContext(Todocontext)
const [displaytodotype,setdisplaytodotype]=useState("all")

 
const completed=todoD.filter((t)=>{
  return t.isDone
})

const noncompleted=todoD.filter((t)=>{
  return !t.isDone
})

let todorender=todoD

if (displaytodotype=="completed") {
  todorender=completed

}else if(displaytodotype=="non-completed") {
  todorender=noncompleted
}else{
  todorender=todoD
}

function Handeltodo() {
  if (!title.trim()) return
    
 const newtodo={
id:uuidv4(),
title:title,
des:des,
isDone:false
}
settodoD([...todoD,newtodo])
localStorage.setItem("todo",JSON.stringify([...todoD,newtodo]))
setTitle("")
 
}


function changehandle(e) {
setdisplaytodotype(e.target.value)
}

const dettodo=todorender.map((t)=>{

return <Todo key={t.id} props={t} />

})
useEffect( ()=>{
const storagedata=JSON.parse(localStorage.getItem("todo"))
if (storagedata) settodoD(storagedata)

},[])
return (
<>
  <Container  maxWidth="sm"
    sx={{maxHeight:"80vh",overflow:"scroll",marginTop:"10%"}}>
    <hr />
    <Card sx={{ width:500}} className='maincard'>
      <CardContent>
        <Typography sx={{fontFamily:"asd", color: 'text.secondary' }} variant='h3' gutterBottom >
          مهامى
        </Typography>
        <Divider />

        <CardActions sx={{fontFamily:"asd",direction:"rtl",marginTop:"30px",flexDirection:"column",gap:"20px"}}>
          {/* togglebtn */}
          {/* togglebtn */}
          <ToggleButtonGroup value={displaytodotype} exclusive onChange={changehandle} aria-label="text alignment">
            <ToggleButton value="all">
              الكل </ToggleButton>
            <ToggleButton value="completed">
              منجز </ToggleButton>
            <ToggleButton value="non-completed">
              غير منجز</ToggleButton>

          </ToggleButtonGroup>
          {dettodo}

          <Grid container
            sx={{height:"100px",width:"100%",display:"flex",justifyContent:"space-around",alignItems:"center"}}>
            <Grid xs={8} sx={{width:"60%",
 justifyContent:"space-around",
 alignItems:"center"}}>
              <TextField sx={{width:"100%"}} id="outlined-basic" value={title} onChange={(e)=>{
                setTitle(e.target.value)

                }} label="عنوان المهمه" variant="outlined" />
                   <TextField sx={{width:"100%"}} id="outlined-basic" value={des} onChange={(e)=>{
                setdes(e.target.value)

                }} label="شرح المهمه" variant="outlined" style={{marginTop:"10px"}}/>
            </Grid>
   
            <Grid xs={4} sx={{height:"55%",
 justifyContent:"space-around",
 alignItems:"center"}}>
              <Button sx={{height:"100%"}} onClick={()=>
                {
                Handeltodo();

                }}

                variant="contained" disabled={title.length==0}>Contained</Button>
            </Grid>
          </Grid>
        </CardActions>
      </CardContent>
    </Card>
  </Container>
</>
);
}
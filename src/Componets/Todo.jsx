import  {  Card, CardContent, IconButton, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import Grid from '@mui/material/Grid';
import { useContext, useEffect, useState } from 'react';
import { Todocontext } from '../Context/contex';
import {Button} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {TextField} from '@mui/material';
export default function Todo({props}) {
  const [todoupdate,settodoupdate]=useState({title:props.title,details:props.des})

const [showdelete,setshowdel]=useState(false)
const [showupdate,setshowupdate]=useState(false)
const {todoD,settodoD}=useContext(Todocontext)
function HandelClickCheck(){

    const updatetodo=todoD.map((t)=>{
        if (t.id==props.id) {
        //   if (t.isDone) {
        //   t.isDone=false
        //   }else{
        //   t.isDone=true
        // }
t.isDone=!t.isDone

        }
        return t
      })
  settodoD(updatetodo)
    localStorage.setItem("todo",JSON.stringify(updatetodo))

}
function deleteItem() {
  setshowdel(true)
}
function handelclose() {
  setshowdel(false)
}

function handelUpdateclose() {
  setshowupdate(false)
}

function handelupdate() {

    setshowupdate(true)

}


function handelconfermdel() {
  const deltodo=todoD.filter((t)=>{
    // if (t.id==props.id) {
    //   return false
    // }else{
    //   return true
    // }
   return t.id !=props.id
  })
  settodoD(deltodo)

}


function handelconfermupdate() {
  const update=todoD.map((t)=>{
    if(t.id==props.id){
      return {...t,title:todoupdate.title,des:todoupdate.details}
    }else{
      return t
    }
  })
  settodoD(update)
  setshowupdate(false)

}


    return (
        <>
                {/* update */}
  <Dialog style={{direction:"rtl"}}
  onClose={handelUpdateclose}
        open={showupdate}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">
          {"هل انت متاكد من التعديل ؟"}
        </DialogTitle>
        <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="عنوان المهمه"
              type="email"
              fullWidth
              variant="standard"
              value={todoupdate.title}
              onChange={(e)=>{
                settodoupdate({...todoupdate,title:e.target.value})
              }}
            />
                   <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              label="التفاصيل"
              type="email"
              fullWidth
              variant="standard"
                  value={todoupdate.details}
              onChange={(e)=>{
                settodoupdate({...todoupdate,details:e.target.value})
              }}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handelUpdateclose} autoFocus>
            اغلاق
          </Button>
          <Button onClick={handelconfermupdate}>نعم اريد التعديل</Button>
        </DialogActions>
      </Dialog>
                {/*// update/ */}
        {/* alertdel */}
  <Dialog style={{direction:"rtl"}}
  onClose={handelclose}
        open={showdelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">
          {"هل انت متاكد من الحذف?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          لا يمكنك الرجوع اذا ضغط نعم اريد الحذف
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handelclose} autoFocus>
            اغلاق
          </Button>
          <Button onClick={handelconfermdel}>نعم اريد الحذف</Button>
        </DialogActions>
      </Dialog>
                {/*// alertdel/ */}

<Card className='sCard' sx={{ bgcolor:"primary.main" ,color:"white",marginLeft :"0px"}}>
 <CardContent>  
 <Grid container rowSpacing={1} style={{ display:"flex",justifyContent:"center",alignItems:"center"}}  columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid  size={6}  >
   <Typography variant='h5' gutterBottom sx={{ color: 'text.secondary' ,textAlign:"right"  }}>
             {props.title}    </Typography>
  </Grid>
  <Grid size={6} style={{ display:"flex",justifyContent:"center",alignItems:"center"}} >
<IconButton className='iconbtn' onClick={()=>{HandelClickCheck()}} style={{background:props.isDone?"#8bc34a":"white",border:"3px solid #8bc34a ",margin:"5px"}}>
<CheckOutlinedIcon />
</IconButton>
<IconButton className='iconbtn' onClick={handelupdate} style={{background:"white",border:"3px solid #8bc34a ",margin:"5px"}}>
<ModeEditOutlinedIcon />
</IconButton><IconButton className='iconbtn'onClick={()=>{deleteItem()}} style={{background:"white",border:"3px solid #8bc34a ",margin:"5px"}}>
<DeleteIcon />
</IconButton>
  </Grid>
<h1 >{props.des}

</h1>
</Grid>
    
       </CardContent>

    </Card>
    </>
    )
}
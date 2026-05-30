import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


function Btn() {
  return (
    <>
      <Button variant="outline-primary">الكل</Button>
      <Button variant="outline-secondary">منجز</Button>
      <Button variant="outline-success">غير منجز</Button>
    </>
  );
}

export default Btn;
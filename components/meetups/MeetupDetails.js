import classes from './MeetupDetails.module.css';

function MeetupDetails(props) {
  //
  return (
    <section className={classes.details}>
      <img src={props.image} alt={props.title} />
      <h3>{props.title}</h3>
      <address>{props.address}</address>
      <h4>{props.description}</h4>
    </section>
  );
}

export default MeetupDetails;

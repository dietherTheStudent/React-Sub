function ProfileCard(props) {
  return (
    <div style={{
      border: "1px solid black",
      padding: "10px",
      margin: "10px",
      borderRadius: "10px"
    }}>
      <h2>{props.name}</h2>
      <p>Course: {props.course}</p>
      <p>Age: {props.age}</p>
      <p>Hobby: {props.hobby}</p>
    </div>
  );
}

export default ProfileCard;
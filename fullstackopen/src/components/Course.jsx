const Course = ({ course }) => {
  
    const total = course.parts.reduce((acc, obj) => {
        return acc + obj.exercises
    }, 0)
  
  
  return (
    <div>
      <h1>{course.name}</h1>
      {course.parts.map((cour) => (
        <p key={cour.id}>
          {cour.name} {cour.exercises}
        </p>
      ))}
      <p>Total of {total} exercises</p>
    </div>
  );
};

export default Course;

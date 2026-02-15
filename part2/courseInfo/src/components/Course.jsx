const Header = ({ name }) => {
    return <h1>{name}</h1>;
};

const Part = ({ part: { name, exercises } }) => {
    return (
        <p>
            {name} {exercises}
        </p>
    );
};

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map((part) => (
                <Part key={part.id} part={part} />
            ))}
        </div>
    );
};

const Total = ({ parts }) => {
    let total = parts.reduce((sum, part) => sum + part.exercises, 0);

    return <b>total of {total} exercises</b>;
};

const Course = ({ course }) => {
    const name = course.name;
    const parts = course.parts;

    return (
        <div>
            <Header name={name} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    );
};

export default Course;
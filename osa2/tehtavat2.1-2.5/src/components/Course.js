import React from 'react'
import Content from './Content'
import Header from './Header'
import Total from './Total'

//tehty tehtävä 2.5 jo kohdassa 2.1 =)

const Course = ({ course }) => {

    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course
import React, { Component } from 'react';
import { gql, useMutation } from '@apollo/client';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./entryform.css"


//
const Edit_STUDENT = gql`
    mutation UpdateStudent(
        $studentId: String!
        $firstName: String!,
        $lastName: String!,
        $email: String!,
        $college: String!,
        $program: String!,
        $startingYear: Int!        
        
        ) {
        updateStudent(
            id: $studentId,
            firstName: $firstName,
            lastName: $lastName,
            email: $email,
            college: $college,
            program: $program,
            startingYear: $startingYear
            
            ) {
            _id
        }
    }
`;
//function component to Edit a student
const EditStudent = () => {
    
    //
    let navigate = useNavigate()
    //
    let studentId,firstName, lastName, email, college, program, startingYear ;
    const [editStudent, { data, loading, error }] = useMutation(Edit_STUDENT);

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
        <div className = 'entryform'>
            <form
                onSubmit={ e => {    
                    e.preventDefault();
                    editStudent( { variables: { studentId: studentId.value, firstName: firstName.value, lastName: lastName.value, 
                    email: email.value, college: college.value, program: program.value,
                    startingYear: parseInt(startingYear.value) } 
                    });
                    //
                    studentId.value='';
                    firstName.value = '';
                    lastName.value='';
                    email.value='';
                    college.value='';
                    program.value='';
                    startingYear.value='';
                    navigate('/studentlist')                    } 
                }
            >

                    <Form.Group>
                        <Form.Label> StudentId:</Form.Label>
                        <Form.Control type="text"  name="studentId" ref={node => {studentId = node; }} 
                            placeholder="Student Id:" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label> First Name:</Form.Label>
                        <Form.Control type="text"  name="firstName" ref={node => {firstName = node; }} 
                            placeholder="First Name:" />
                    </Form.Group>                   
                    

                    <Form.Group>
                        <Form.Label> Last Name:</Form.Label>
                        <Form.Control type="text" name="lastName" ref={node => {lastName = node; }} 
                            placeholder="Last Name:" />
                    </Form.Group> 

                    <Form.Group>
                        <Form.Label> Email:</Form.Label>
                        <Form.Control type="text"  name="email" ref={node => {email = node; }} 
                            placeholder="Email:" />
                    </Form.Group>                     
                

                    <Form.Group>
                        <Form.Label> College:</Form.Label>
                        <Form.Control type="text"  name="college" ref={node => {college = node; }} 
                            placeholder="College:" />
                    </Form.Group>  
                
                    <Form.Group>
                        <Form.Label> Program:</Form.Label>
                        <Form.Control type="text"  name="program" ref={node => {program = node; }} 
                            placeholder="Program:" />
                    </Form.Group>                    
                
                    <Form.Group>
                        <Form.Label> Starting Year:</Form.Label>
                        <Form.Control type="text"  name="startingYear" ref={node => {startingYear = node; }} 
                            placeholder="Starting Year:" />
                    </Form.Group>                     
                    
                    <Button variant="primary" type="submit"> Edit Student </Button>
                    
            </form>
        </div>
    );
}

export default EditStudent;
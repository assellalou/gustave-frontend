import React from "react";
import styled from "styled-components";

const CourseCard = ({ course }) => {
  return (
    <Course>
      <CoursePreview>
        <CourseH6>{course.subject}</CourseH6>
        <CourseH2>{course.name}</CourseH2>
        <CourseTeacher>{course.teacher}</CourseTeacher>
      </CoursePreview>
      <CourseInfo>
        <CourseH2>{course.chapter}</CourseH2>
        <CourseLink href={course.link}>Continue</CourseLink>
      </CourseInfo>
    </Course>
  );
};

const Course = styled.div`
  border-radius: 5px;
  box-shadow: 9px 9px 33px #e1e1e1, -9px -9px 33px #f9f9f9;
  display: flex;
  width: 500px;
  max-width: 100%;
  min-width: 100px;
  margin: 20px 10px;
  overflow: hidden;
  @media (max-width: 900px) {
    flex-direction: column;
    min-width: 250px;
    width: auto;
  }
`;
const CourseH6 = styled.h6`
  opacity: 0.6;
  margin: 0;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const CourseH2 = styled.h2`
  letter-spacing: 1px;
  margin: 10px 0;
  max-width: 200px;
`;
const CourseTeacher = styled.h3`
  color: #fff;
  display: inline-block;
  font-size: 12px;
  opacity: 0.6;
  margin-top: 30px;
`;
const CoursePreview = styled.div`
  background-color: #ce3d3d;
  color: #fff;
  padding: 30px;
  width: 350px;
`;

const CourseInfo = styled.div`
  padding: 30px;
  position: relative;
  width: 100%;
  border: 1px solid #eee;
`;
const CourseLink = styled.a`
  background: #ededed;
  box-shadow: 6px 6px 30px #cecece, -6px -6px 30px #ffffff;
  border-radius: 50px;
  text-decoration: none;
  color: #333;
  font-size: 16px;
  padding: 12px 20px;
  position: absolute;
  bottom: 30px;
  right: 30px;
  letter-spacing: 1px;
  transition: all 0.5s;
  &:hover {
    background: #ce3d3d;
    color: #eee;
  }
  @media (max-width: 900px) {
    bottom: 150px;
    font-size: 14px;
    background: #ce3d3d;
    box-shadow: 5px 5px 6px #9f2f2f, -5px -5px 6px #fd4b4b;
    color: #eee;
    &:hover {
      box-shadow: inset 5px 5px 6px #9f2f2f, inset -5px -5px 6px #fd4b4b;
    }
  }
`;

export default CourseCard;

package com.infosys.educationConsultancyApplication.dao;

import java.util.List;

import com.infosys.educationConsultancyApplication.bean.Student;

public interface StudentDao {

    public void save(Student student);
    public Student getStudentById(String registrationNumber);
    public List<Student> getAllStudents();
    //public void deleteStudentById(String registrationNumber);
    //public List<Student> getStudentsByLevel(String studentLevel);
    public String generateRegistration ();
    public List<Student> getCurrentStudents();
    public String getStudentStatusByUsername(String username);
    public Student getStudentByUsername(String username);
}
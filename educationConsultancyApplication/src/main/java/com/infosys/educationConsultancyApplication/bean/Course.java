package com.infosys.educationConsultancyApplication.bean;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
//@AllArgsConstructor
//@NoArgsConstructor
//@Getter(AccessLevel.PUBLIC)
//@Setter(AccessLevel.PUBLIC)
//@ToString
public class Course {
	@Id
	private Long courseId;
	private String courseName;
	private Integer hours;
	private Double price;
	private String technology;
	
	public Course() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Long getCourseId() {
		return courseId;
	}
	public void setCourseId(Long courseId) {
		this.courseId = courseId;
	}
	public String getCourseName() {
		return courseName;
	}
	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}
	public Integer getHours() {
		return hours;
	}
	public void setHours(Integer hours) {
		this.hours = hours;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public String getTechnology() {
		return technology;
	}
	public void setTechnology(String technology) {
		this.technology = technology;
	}
	public Course(Long courseId, String courseName, Integer hours, Double price, String technology) {
		super();
		this.courseId = courseId;
		this.courseName = courseName;
		this.hours = hours;
		this.price = price;
		this.technology = technology;
	}
	
}
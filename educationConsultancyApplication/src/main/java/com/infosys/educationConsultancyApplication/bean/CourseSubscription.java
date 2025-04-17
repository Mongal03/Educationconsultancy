package com.infosys.educationConsultancyApplication.bean;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;


@Entity
public class CourseSubscription {
    @Id
    private String subscriptionId; //auto generated 
    private String studentId;	//auto assigned
    private Long courseId;   	// auto assigned
    private String subscriptionDate; // auto assignment from system date
    private String endDate;		// calculate assignment 90 days from sub date
    private Integer installments; // 2 or 3 installments
    private double installmentAmount; // @10% interest
    private String status; // Active(true) //Expired(false) 
    public CourseSubscription() {
        super();
    }

    public CourseSubscription(String subscriptionId, String studentId, Long courseId, String subscriptionDate, String endDate, Integer installments, double installmentAmount, String status) {
        super();
        this.subscriptionId = subscriptionId;
        this.studentId = studentId;
        this.courseId = courseId;
        this.subscriptionDate = subscriptionDate;
        this.endDate = endDate;
        this.installments = installments;
        this.installmentAmount = installmentAmount;
        this.status = status;
    }

    public String getSubscriptionId() {
        return subscriptionId;
    }

    public void setSubscriptionId(String subscriptionId) {
        this.subscriptionId = subscriptionId;
    }

    public String getStudentId() { // Corrected Long to String for studentId as per declaration
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public String getSubscriptionDate() {
        return subscriptionDate;
    }

    public void setSubscriptionDate(String subscriptionDate) {
        this.subscriptionDate = subscriptionDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public Integer getInstallments() {
        return installments;
    }

    public void setInstallments(Integer installments) {
        this.installments = installments;
    }

    public Double getinstallmentAmount() {
        return installmentAmount;
    }

    public void setinstallmentAmount(Double installmentAmount) {
        this.installmentAmount = installmentAmount;
    }

    public String getStatus() { // Status field accessor for consistency
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "CourseSubscription [subscriptionId=" + subscriptionId + ", studentId=" + studentId + ", courseId=" + courseId 
            + ", subscriptionDate=" + subscriptionDate + ", endDate=" + endDate 
            + ", installments=" + installments + ", installmentAmount=" + installmentAmount + ", status=" + status + "]";
    }
}
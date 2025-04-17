package com.infosys.educationConsultancyApplication.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.infosys.educationConsultancyApplication.bean.Payment;

@Service
@Repository
public class PaymentDaoImpl implements PaymentDao {
	@Autowired
	private PaymentRepository repository;
	
	@Override
	public void save(Payment payment) {
		repository.save(payment);
	}
	
	@Override
	public Payment getPaymentByBill(String billNumber) {
		return repository.findById(billNumber).get();
	}
	
	@Override
	public List<Payment> getAllBills(){
		return repository.findAll();
	}
	
	@Override
	public List<Payment> getBillBySubscriptionId(String subscriptionId){
		return repository.getBillBySubscriptionId(subscriptionId);
	}
	
	@Override
	public List<Payment> getBillByStudentId(String studentId){
		return repository.getBillByStudentId(studentId);
	}
	
	@Override
	public String generateBillNumber() {
		Long id=0L;
		String val=repository.getMaxBillNumber();
		if(val==null)
			id=1000001L;
		else {
			id=Long.parseLong(val.substring(2));
			id++;
		}
		String newId="BL"+id;
		return newId;
	}
}
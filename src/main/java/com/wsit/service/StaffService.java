package com.wsit.service;

import java.util.List;

import com.wsit.utils.PageData;

public interface StaffService {
	
	public List<PageData> staffPage(PageData pd)throws Exception;
	
	public PageData staffOne(String id)throws Exception;
	
	public void addStaff(PageData pd)throws Exception;
	
	public void modStaff(PageData pd)throws Exception;
	
	public void batchDelStaff(List ids)throws Exception;

}

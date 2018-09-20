package com.wsit.service;

import java.util.List;

import com.wsit.utils.PageData;

public interface DepartService {
	
	
	public List<PageData> departPage(PageData pd)throws Exception;
	
	public PageData departOne(String id)throws Exception;
	
	public List<PageData> departList()throws Exception;
	
	public List<PageData> company()throws Exception;
	
	public void addDepart(PageData pd)throws Exception;
	
	public void modDepart(PageData pd)throws Exception;
	
	public void batchDelDepart(List ids)throws Exception;

}

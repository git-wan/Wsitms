package com.wsit.service;

import java.util.List;

import com.wsit.utils.PageData;

public interface AseetService {
	
    public List<PageData> aseetPage(PageData pd)throws Exception;
	
	public PageData aseetOne(String id)throws Exception;
	
	public List<PageData> aseetList()throws Exception;
	
	public PageData serverOne(String id)throws Exception;
	
	public List<PageData> serverList()throws Exception;
	
	public void addServer(PageData pd)throws Exception;
	
	public void delServer(PageData pd)throws Exception;
	
	public void modServer(PageData pd)throws Exception;
	
	public List<PageData> querySer(PageData pd)throws Exception;
	
	

}

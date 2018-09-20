package com.wsit.service;

import java.util.List;

import com.wsit.utils.PageData;

public interface AseetService {
	
    public List<PageData> aseetPage(PageData pd)throws Exception;
	
	public PageData aseetOne(String id)throws Exception;
	
	public List<PageData> aseetList()throws Exception;

}

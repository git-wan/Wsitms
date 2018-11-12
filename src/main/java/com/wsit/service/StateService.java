package com.wsit.service;

import java.util.List;
import java.util.Set;

import com.wsit.utils.PageData;

public interface StateService {
	
	
	public List<PageData> ipPatorl(PageData pd)throws Exception;
	
	public List<PageData> dbPatorl(PageData pd)throws Exception;
	
	public List<PageData> webPatorl(PageData pd)throws Exception;
	
	public List<PageData> tableSpace(PageData pd)throws Exception;
	
	public List<PageData> ipStatus(PageData pd)throws Exception;
	
	public List<PageData> dbStatus(PageData pd)throws Exception;
	
	public List<PageData> webStatus(PageData pd)throws Exception;

	public List<PageData> tableSpaceStatus(PageData pd)throws Exception;
	
	public List<PageData> queryTable(PageData pd)throws Exception;
	
	public List<String> queryEntity()throws Exception;
	
	public void addError(PageData pd)throws Exception;
		
	public void addStatus(PageData pd)throws Exception;
	
	public List<PageData> queryStatus(PageData pd)throws Exception;
	
	
}

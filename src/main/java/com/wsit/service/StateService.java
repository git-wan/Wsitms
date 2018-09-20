package com.wsit.service;

import java.util.List;

import com.wsit.utils.PageData;

public interface StateService {
	
	
	public List<PageData> ipPatorl(PageData pd)throws Exception;
	
	public List<PageData> dbPatorl(PageData pd)throws Exception;
	
	public List<PageData> tableSpace(PageData pd)throws Exception;
	
	public List<PageData> ipStatus(PageData pd)throws Exception;
	
	public List<PageData> dbStatus(PageData pd)throws Exception;

	public List<PageData> tableSpaceStatus(PageData pd)throws Exception;
	
	

}

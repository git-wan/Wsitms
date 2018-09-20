package com.wsit.service;

import java.util.List;

import com.wsit.utils.PageData;

public interface ModuleService {
	
	
	public List<PageData> moduleList(PageData pd)throws Exception;
	
	public PageData moduleOne(String id)throws Exception;
	
	public void addModule(PageData pd)throws Exception;
	
	public void modModule(PageData pd)throws Exception;

}

package com.wsit.service;

import java.util.List;

import com.wsit.utils.PageData;

public interface InitService {
	
	public List<PageData> sysCodePage(PageData pd)throws Exception;
	
	public PageData sysCodeOne(String id)throws Exception;
	
	public List<PageData> sysCodeList()throws Exception;
	
	public List<PageData> propList()throws Exception;
	
	public List<PageData> entityList()throws Exception;
	
	public List<PageData> queryEnt(String str)throws Exception;
	
	public List<PageData> entityPropList(PageData pd)throws Exception;
	
	public List<PageData> entPropEntry(PageData pd)throws Exception;
	
	public void addProp(PageData pd)throws Exception;
	
	public void addSysCode(PageData pd)throws Exception;
	
	public void addSysCodeInfo(PageData pd)throws Exception;
	
	public void addEntity(PageData pd)throws Exception;
	
	public void addEntityProp(PageData pd)throws Exception;
	
	public void modProp(PageData pd)throws Exception;
	
	public void modEntity(PageData pd)throws Exception;
	
	public void modEntityProp(PageData pd)throws Exception;
		
	public void modSysCode(PageData pd)throws Exception;
	
	public void modSysCodeInfo(PageData pd)throws Exception;
	
	public void batchDelSysCode(List ids)throws Exception;
	
	public void batchDelSysCodeInfo(List ids)throws Exception;
	
	public List<PageData> sysCodeInfoList(PageData pd)throws Exception;
}

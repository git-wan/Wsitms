package com.wsit.service;

import java.util.List;

import com.wsit.utils.PageData;

public interface AssessService {
	
	public List<PageData>  assInfoList(PageData pd)throws Exception;
	
	public List<PageData>  queryDate(PageData pd)throws Exception;
	
	public void addAssInfo(PageData pd)throws Exception;
	
	public void modAssInfo(PageData pd)throws Exception;
	
	public void delAssInfo(PageData pd)throws Exception;
	
	public List<PageData> assessList(PageData pd)throws Exception;
	
	public void addAss(PageData pd)throws Exception;
	
	public List<PageData> AssResList(PageData pd)throws Exception;
	
	public void modAssSco(PageData pd)throws Exception;
	
	public List<PageData> getMonthAss(PageData pd)throws Exception;
		
	public List<PageData> assInfo(PageData pd)throws Exception;
	
	public List<PageData> asjList(PageData pd)throws Exception;	
	
	public List<PageData> assplanList(PageData pd)throws Exception;
	
	public void addAssPlan(PageData pd)throws Exception;
		

		
	public List<PageData> AssResultList(PageData pd)throws Exception;

	void addAssAsj(PageData pd)throws Exception;

	void modAssAsj(PageData pd)throws Exception;

	void modAssPlan(PageData pd)throws Exception;

	void delAssPlan(PageData pd)throws Exception;

	void delAssAsj(PageData pd)throws Exception;

	List<PageData> assInfoNameList(PageData pd)throws Exception;

	int isAsj(PageData pd)throws Exception;

	List<String>  getAsj(PageData pd)throws Exception;
}

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
	
	public void modAss(PageData pd)throws Exception;
	
	public void delAss(PageData pd)throws Exception;
	
	public List<PageData> AssResList(PageData pd)throws Exception;
	
	public void addAssRes(PageData pd)throws Exception;
	
	public void modAssRes(PageData pd)throws Exception;
	
	public void delAssRes(PageData pd)throws Exception;
	
	public void modAssSco(PageData pd)throws Exception;
	
	public List<PageData> getMonthAss(PageData pd)throws Exception;
		
	public List<PageData> assInfo(PageData pd)throws Exception;
	
	public List<PageData> asjList(PageData pd)throws Exception;	
	
	public List<PageData> assTimeList(PageData pd)throws Exception;	
	
	public void addAssTime(PageData pd)throws Exception;
		
	public List<PageData> asspatList(PageData pd)throws Exception;	
		
	public List<PageData> AssResultList(PageData pd)throws Exception;
}

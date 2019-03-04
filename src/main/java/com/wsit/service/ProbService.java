package com.wsit.service;

import java.util.List;

import com.wsit.utils.PageData;

public interface ProbService {
	
	
	public List<PageData> questList(PageData pd)throws Exception;
	
	public List<PageData> overProblem(PageData pd)throws Exception;
		
	public void batchEdit(List<PageData> list)throws Exception;
	
	public List<PageData> opTempList()throws Exception;
	
	public void problemBack(PageData pd)throws Exception;
	
	public void addQuest(PageData pd)throws Exception;
	
	public void addOpTemp(PageData pd)throws Exception;
	
	public void addOp(PageData pd)throws Exception;
	
	public List<PageData> backDetail(PageData pd)throws Exception;
	
	public List<PageData> backOp(PageData pd)throws Exception;
	
	public List<PageData> artList (PageData pd)throws Exception;
	
	public void  addArt (PageData pd)throws Exception;
	
	public void modArt(PageData pd)throws Exception;
	
	public void hit(PageData pd)throws Exception;
	
	public void delPorb(PageData pd)throws Exception;
	
	
}

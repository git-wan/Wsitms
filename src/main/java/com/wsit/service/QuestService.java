package com.wsit.service;

import java.util.List;

import com.wsit.utils.PageData;

public interface QuestService {
	
	
	public List<PageData> questList(PageData pd)throws Exception;
	
	public void batchEdit(List<PageData> list)throws Exception;
	
	public List<PageData> opTempList()throws Exception;
	
}

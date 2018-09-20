package com.wsit.service;

import java.util.List;

import com.wsit.utils.PageData;

public interface GroupService {
	
	public List<PageData> groupList(PageData pd)throws Exception;
	
	public void addGroup(PageData pd)throws Exception;
	
	public void modGroup(PageData pd)throws Exception;

}

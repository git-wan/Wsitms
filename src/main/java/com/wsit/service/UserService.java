package com.wsit.service;

import java.util.List;

import com.wsit.utils.PageData;

public interface UserService {
	
	public PageData getUserInfo(PageData pd)throws Exception;
	
	public List<PageData> userPage(PageData pd)throws Exception;
	
	public List<PageData> userList()throws Exception;
	
	public PageData userOne(String id)throws Exception;
	
	public void addUser(PageData pd)throws Exception;
	
	public void modUser(PageData pd)throws Exception;

}

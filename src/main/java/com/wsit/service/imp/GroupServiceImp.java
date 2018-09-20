package com.wsit.service.imp;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.wsit.dao.DaoSupport;
import com.wsit.service.GroupService;
import com.wsit.utils.PageData;
@Service
public class GroupServiceImp implements GroupService{

	@Resource
	DaoSupport dao;
	@Override
	public List<PageData> groupList(PageData pd) throws Exception {
		
		return (List<PageData>) dao.findForList("GroupMapper.groupList", pd);
	}

	@Override
	public void addGroup(PageData pd) throws Exception {
		
		dao.save("GroupMapper.addGroup", pd);
	}

	@Override
	public void modGroup(PageData pd) throws Exception {
		
		dao.update("GroupMapper.modGroup", pd);
	}

}

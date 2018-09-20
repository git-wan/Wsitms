package com.wsit.service.imp;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.wsit.dao.DaoSupport;
import com.wsit.service.QuestService;
import com.wsit.utils.PageData;
@Service
public class QuestServiceImp implements QuestService{

	@Resource
	DaoSupport dao;

	@Override
	public List<PageData> questList(PageData pd) throws Exception {
		// TODO Auto-generated method stub
		return (List<PageData>) dao.findForList("QuestMapper.questList", pd);
	}

	@Override
	public void batchEdit(List<PageData> list) throws Exception {
	
		
		  dao.batchUpdate("QuestMapper.batchEdit", list);
	}

	@Override
	public List<PageData> opTempList() throws Exception {
		
		return (List<PageData>) dao.findForList("QuestMapper.opTempList", null);
	}
}

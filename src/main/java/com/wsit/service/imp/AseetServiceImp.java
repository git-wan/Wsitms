package com.wsit.service.imp;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.wsit.dao.DaoSupport;
import com.wsit.service.AseetService;
import com.wsit.utils.PageData;
@Service
public class AseetServiceImp implements AseetService{
	@Resource
	DaoSupport  dao;

	@Override
	public List<PageData> aseetPage(PageData pd) throws Exception {
		
		return (List<PageData>) dao.findForList("AseetMapper.aseetPage", pd);
	}

	@Override
	public PageData aseetOne(String id) throws Exception {
		
		return (PageData) dao.findForObject("AseetMapper.aseetOne", id);
	}

	@Override
	public List<PageData> aseetList() throws Exception {
		
		return null;
	}

}

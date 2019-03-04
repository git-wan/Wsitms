package com.wsit.service.imp;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.wsit.dao.DaoSupport;
import com.wsit.service.AseetService;
import com.wsit.utils.PageData;

@Service
public class AseetServiceImp implements AseetService {
	@Resource
	DaoSupport dao;

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

	@Override
	public PageData serverOne(String id) throws Exception {
		return (PageData) dao.findForObject("ServerMapper.serverOne", id);
	}

	@Override
	public List<PageData> serverList() throws Exception {
		return (List<PageData>) dao.findForList("ServerMapper.serverList", null);
	}

	@Override
	public void addServer(PageData pd) throws Exception {
		dao.findForList("ServerMapper.addServer", pd);
	}

	@Override
	public void delServer(PageData pd) throws Exception {
		dao.findForList("ServerMapper.delServer", pd);
	}

	@Override
	public void modServer(PageData pd) throws Exception {
		dao.findForList("ServerMapper.modServer", pd);
	}

	@Override
	public List<PageData> querySer(PageData pd) throws Exception {		
		return (List<PageData>) dao.findForList("ServerMapper.querySer", pd);
	}

}

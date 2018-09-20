package com.wsit.service.imp;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.wsit.dao.DaoSupport;
import com.wsit.service.DepartService;
import com.wsit.utils.PageData;
@Service
public class DepartServiceImp implements DepartService{
	
	@Resource
	DaoSupport  dao;

	@Override
	public List<PageData> departPage(PageData pd) throws Exception {
		
		return (List<PageData>) dao.findForList("DepartMapper.departPage", pd);
	}

	@Override
	public void addDepart(PageData pd) throws Exception {
		
		dao.save("DepartMapper.addDepart", pd);
	}

	@Override
	public void modDepart(PageData pd) throws Exception {
		
		dao.update("DepartMapper.modDepart", pd);
	}

	@Override
	public void batchDelDepart(List ids) throws Exception {
		
		dao.batchDelete("DepartMapper.batchDelDepart", ids);
	}

	@Override
	public PageData departOne(String id) throws Exception {

		return (PageData) dao.findForObject("DepartMapper.departOne", id);
	}

	@Override
	public List<PageData> company() throws Exception {
		
		return (List<PageData>) dao.findForList("DepartMapper.company", null);
	}

	@Override
	public List<PageData> departList() throws Exception {
		
		return (List<PageData>) dao.findForList("DepartMapper.departList", null);
	}

}

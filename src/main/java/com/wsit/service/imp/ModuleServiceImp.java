package com.wsit.service.imp;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.wsit.dao.DaoSupport;
import com.wsit.service.ModuleService;
import com.wsit.utils.PageData;
@Service
public class ModuleServiceImp implements ModuleService{

	@Resource
	DaoSupport dao;
	@Override
	public List<PageData> moduleList(PageData pd) throws Exception {
		
		return (List<PageData>) dao.findForList("ModuleMapper.moduleList", pd);
	}

	@Override
	public void addModule(PageData pd) throws Exception {
		
		dao.save("ModuleMapper.addModule", pd);
	}

	@Override
	public void modModule(PageData pd) throws Exception {
		
		dao.update("ModuleMapper.modModule", pd);
	}

	@Override
	public PageData moduleOne(String id) throws Exception {

		return (PageData) dao.findForObject("ModuleMapper.moduleOne", id);
	}

}

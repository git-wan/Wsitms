package com.wsit.service.imp;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.wsit.dao.DaoSupport;
import com.wsit.service.InitService;
import com.wsit.utils.PageData;
@Service
public class InitServiceImp implements InitService{

	@Resource
	DaoSupport dao;

	@Override
	public List<PageData> sysCodePage(PageData pd) throws Exception {

		return (List<PageData>) dao.findForList("SysCodeMapper.sysCodePage", pd);
	}

	@Override
	public PageData sysCodeOne(String id) throws Exception {
		// TODO Auto-generated method stub
		return (PageData) dao.findForObject("SysCodeMapper.sysCodeOne", id);
	}

	@Override
	public List<PageData> sysCodeList() throws Exception {

		return (List<PageData>) dao.findForList("SysCodeMapper.sysCodeList", null);
	}

	@Override
	public void addSysCode(PageData pd) throws Exception {
	
		dao.save("SysCodeMapper.addSysCode", pd);
		
	}

	@Override
	public void modSysCode(PageData pd) throws Exception {
		dao.update("SysCodeMapper.modSysCode", pd);
		
	}

	@Override
	public void batchDelSysCode(List ids) throws Exception {
		
		dao.batchDelete("SysCodeMapper.batchDelSysCode", ids);
	}

	@Override
	public List<PageData> sysCodeInfoList(PageData pd) throws Exception {

		return (List<PageData>) dao.findForList("SysCodeInfoMapper.sysCodeInfoList", pd);
	}

	@Override
	public void addSysCodeInfo(PageData pd) throws Exception {
		dao.save("SysCodeInfoMapper.addSysCodeInfo", pd);
		
	}

	@Override
	public void modSysCodeInfo(PageData pd) throws Exception {
		
		dao.update("SysCodeInfoMapper.modSysCodeInfo", pd);
		
	}
	
	@Override
	public void batchDelSysCodeInfo(List ids) throws Exception {		
		dao.batchDelete("SysCodeInfoMapper.batchDelSysCodeInfo", ids);
	}

	@Override
	public List<PageData> propList() throws Exception {
		
		return (List<PageData>) dao.findForList("PropMapper.propList", null);
	}

	@Override
	public void addProp(PageData pd) throws Exception {
		dao.save("PropMapper.addProp", pd);
		
	}

	@Override
	public List<PageData> entityList() throws Exception {		
		return (List<PageData>) dao.findForList("EntityMapper.entityList", null);
	}

	@Override
	public void addEntity(PageData pd) throws Exception {
		dao.save("EntityMapper.addEntity", pd);
		
	}

	@Override
	public List<PageData> entityPropList(PageData pd) throws Exception {
		
		return (List<PageData>) dao.findForList("EntityPropMapper.entityPropList", pd);
	}

	@Override
	public void addEntityProp(PageData pd) throws Exception {
		dao.save("EntityPropMapper.addEntityProp", pd);
		
	}

	@Override
	public void modEntity(PageData pd) throws Exception {
		dao.update("EntityMapper.modEntity", pd);
		
	}

	@Override
	public void modProp(PageData pd) throws Exception {
		
		dao.update("PropMapper.modProp", pd);
	}

	@Override
	public void modEntityProp(PageData pd) throws Exception {
		dao.update("EntityPropMapper.modEntityProp", pd);
		
	}

	@Override
	public List<PageData> queryEnt(String str) throws Exception {
		// TODO Auto-generated method stub
		return (List<PageData>) dao.findForList("EntityMapper.queryEnt", str);
	}

	@Override
	public List<PageData> entPropEntry(PageData pd) throws Exception {
	
		return (List<PageData>) dao.findForList("EntityPropMapper.entPropEntry", pd);
	}

	@Override
	public List<PageData> entValList() throws Exception {
		// TODO Auto-generated method stub
		return (List<PageData>) dao.findForList("EntityMapper.entValList", null);
	}

}

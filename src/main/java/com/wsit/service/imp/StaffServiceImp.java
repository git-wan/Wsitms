package com.wsit.service.imp;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.wsit.dao.DaoSupport;
import com.wsit.service.StaffService;
import com.wsit.utils.PageData;
@Service
public class StaffServiceImp implements StaffService{

	@Resource
	DaoSupport dao;
	@Override
	public List<PageData> staffPage(PageData pd) throws Exception {
		
		return (List<PageData>) dao.findForList("StaffMapper.staffPage", pd);
	}

	@Override
	public PageData staffOne(String id) throws Exception {
	
		return (PageData) dao.findForObject("StaffMapper.staffOne", id);
	}

	@Override
	public void addStaff(PageData pd) throws Exception {
		
		dao.save("StaffMapper.addStaff", pd);
		
	}

	@Override
	public void modStaff(PageData pd) throws Exception {
		dao.update("StaffMapper.modStaff", pd);
		
	}

	@Override
	public void batchDelStaff(List ids) throws Exception {
		dao.batchDelete("Staffmapper.batchDelStaff", ids);
		
	}

}

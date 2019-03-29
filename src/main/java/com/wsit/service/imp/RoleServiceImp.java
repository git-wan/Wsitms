package com.wsit.service.imp;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.wsit.dao.DaoSupport;
import com.wsit.service.RoleService;
import com.wsit.utils.PageData;
@Service
public class RoleServiceImp implements RoleService{
	@Resource
	DaoSupport dao;

	@Override
	public List<PageData> roleList(PageData pd) throws Exception {		
		return (List<PageData>) dao.findForList("RoleMapper.roleList", pd);
	}

	@Override
	public void addRole(PageData pd) throws Exception {
		dao.save("RoleMapper.addRole", pd);		
	}

	@Override
	public void modRole(PageData pd) throws Exception {
		PageData pageData = new PageData();
		String USER_ROLE = (String) dao.findForObject("RoleMapper.queryRole",pd);
		pageData.put("USER_ROLE",USER_ROLE);
		pageData.put("ROLE_NAME",pd.getString("ROLE_NAME"));
		dao.update("UserMapper.upRole",pageData);
		dao.update("RoleMapper.modRole", pd);		
	}
	


}

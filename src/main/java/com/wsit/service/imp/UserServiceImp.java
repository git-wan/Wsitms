package com.wsit.service.imp;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.wsit.dao.DaoSupport;
import com.wsit.service.UserService;
import com.wsit.utils.DateUtil;
import com.wsit.utils.PageData;

@Service
public class UserServiceImp implements UserService {
	@Resource
	DaoSupport dao;

	@Override
	public PageData getUserInfo(PageData pd) throws Exception {
		return (PageData) dao.findForObject("UserMapper.getUserInfo", pd);
	}

	@Override
	public List<PageData> userPage(PageData pd) throws Exception {

		return (List<PageData>) dao.findForList("UserMapper.userPage", pd);
	}

	@Override
	public void addUser(PageData pd) throws Exception {
		dao.save("UserMapper.addUser", pd);

	}

	@Override
	public void modUser(PageData pd) throws Exception {
		dao.update("UserMapper.modUser", pd);
	}

	@Override
	public PageData userOne(String id) throws Exception {
		return (PageData) dao.findForObject("UserMapper.userOne", id);
	}

	@Override
	public List<PageData> userList() throws Exception {
		return (List<PageData>) dao.findForList("UserMapper.userList", null);
	}

	@Override
	public void editPass(PageData pd) throws Exception {
		dao.update("UserMapper.editPass", pd);
	}

	@Override
	public List<PageData> getZX() throws Exception {
		return (List<PageData>) dao.findForList("UserMapper.getZX", null);
	}
}

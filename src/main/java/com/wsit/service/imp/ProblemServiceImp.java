package com.wsit.service.imp;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.wsit.dao.DaoSupport;
import com.wsit.service.ProblemService;
import com.wsit.utils.PageData;
@Service
public class ProblemServiceImp implements ProblemService{

	@Resource
	DaoSupport dao;

	@Override
	public List<PageData> problemList(PageData pd) throws Exception {
		return (List<PageData>) dao.findForList("ProbMapper.problemList", pd);
	}
	
	
}

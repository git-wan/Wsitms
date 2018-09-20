package com.wsit.service.imp;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.wsit.dao.DaoSupport;
import com.wsit.service.LogService;
@Service
public class LogServiceImp implements LogService{
	@Resource
	DaoSupport dao;

}

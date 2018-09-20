package com.wsit.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wsit.service.StateService;
import com.wsit.utils.PageData;
@RequestMapping("/state")
@Controller
public class StateController extends BaseController{

	@Resource
	StateService   stateService;
	
	
	@RequestMapping(value="/ipPatorl",method=RequestMethod.GET)
	@ResponseBody
	public Object userList(){
		PageData pd =this.getPageData();
		try {
			return stateService.ipPatorl(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@RequestMapping(value="/tableSpace",method=RequestMethod.GET)
	@ResponseBody
	public Object tableSpace(){
		PageData pd =this.getPageData();
		try {
			return stateService.tableSpace(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@RequestMapping(value="/dbPatorl",method=RequestMethod.GET)
	@ResponseBody
	public Object dbPatorl(){
		PageData pd =this.getPageData();
		try {
			return stateService.dbPatorl(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@RequestMapping(value="/ipStatus",method=RequestMethod.GET)
	@ResponseBody
	public Object ipStatus(){
		PageData pd =this.getPageData();
		try {
			return stateService.ipStatus(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	
	@RequestMapping(value="/dbStatus",method=RequestMethod.GET)
	@ResponseBody
	public Object dbStatus(){
		PageData pd =this.getPageData();
		try {
			return stateService.dbStatus(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
}

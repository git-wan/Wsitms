package com.wsit.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wsit.service.RoleService;
import com.wsit.utils.PageData;
@RequestMapping("role")
@Controller
public class RoleController extends BaseController{
	
	@Resource
	RoleService roleService;
	
	
	@RequestMapping(value="/load" ,method=RequestMethod.GET)
	@ResponseBody
	public Object load(){
		PageData pd =this.getPageData();
		try {
			return roleService.roleList(pd);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	@RequestMapping(value="/addRole",method=RequestMethod.POST)
	@ResponseBody
	public Object addRole(){
		PageData pd =this.getPageData();
		Map<String, Object> map =new HashMap<String, Object>();
		try {
			roleService.addRole(pd);
		} catch (Exception e) {		
			e.printStackTrace();
			map.put("success", false);
			map.put("msg", "数据提交出现异常");
			return map;
		}
		map.put("success", true);
		map.put("msg", "数据添加成功");
		return map;	
	}
	
	@RequestMapping(value="/modRole",method=RequestMethod.POST)
	@ResponseBody
	public Object modRole(){
		PageData pd =this.getPageData();
		Map<String, Object> map =new HashMap<String, Object>();
		try {
			roleService.modRole(pd);
			System.out.println(pd);
		} catch (Exception e) {		
			e.printStackTrace();
			map.put("success", false);
			map.put("msg", "数据提交出现异常");
			return map;
		}
		map.put("success", true);
		map.put("msg", "数据修改成功");
		return map;	
	}

}

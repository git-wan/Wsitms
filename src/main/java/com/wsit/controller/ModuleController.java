package com.wsit.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wsit.service.ModuleService;
import com.wsit.utils.DateUtil;
import com.wsit.utils.PageData;
import com.wsit.utils.Tools;
@RequestMapping("module")
@Controller
public class ModuleController extends BaseController{
	
	@Resource
	ModuleService moduleService;
	
	@RequestMapping(value="/load",method=RequestMethod.GET)
	@ResponseBody
	public Object load(){
		PageData pd = this.getPageData();
		String id =pd.getString("id");
		
		try {
			if(Tools.notEmpty(id)){
				return moduleService.moduleOne(id);
			}
			return moduleService.moduleList(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	
	
	
	@RequestMapping(value="/addModule" ,method=RequestMethod.POST)
	@ResponseBody
	public Object addModule(){
		PageData pd =this.getPageData();
		Map<String, Object> map =new HashMap<String, Object>();
		try {
			pd.put("MODULE_ID", this.get32UUID());
			String dateStr = pd.getString("UPDATETIME");
			if(Tools.notEmpty(dateStr)){
			Date date =DateUtil.fomatDate(dateStr);
			pd.put("VALID_SDATE", date);
			}
			moduleService.addModule(pd);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			map.put("success", false);
			map.put("msg", "数据提交出现异常");
			return map;
		}
		map.put("success", true);
		map.put("msg", "数据添加成功");
		return map;		
	}
	
	@RequestMapping(value="ModUser",method=RequestMethod.POST)
	@ResponseBody
	public Object  ModUser(){
		PageData pd  =this.getPageData();
		Map<String, Object> map =new HashMap<String, Object>();
		try {
			String dateStr = pd.getString("UPDATETIME");
			if(Tools.notEmpty(dateStr)){
			Date date =DateUtil.fomatDate(dateStr);
			pd.put("VALID_SDATE", date);
			}
			moduleService.modModule(pd);
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

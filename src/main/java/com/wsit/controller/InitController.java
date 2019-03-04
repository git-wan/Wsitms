package com.wsit.controller;

import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wsit.service.InitService;
import com.wsit.utils.DateUtil;
import com.wsit.utils.PageData;
import com.wsit.utils.Tools;
@RequestMapping("/init")
@Controller
public class InitController extends BaseController{

	@Resource
	InitService initService;
	

	@RequestMapping(value="/load",method=RequestMethod.GET)
	@ResponseBody
	public Object  load(){
		PageData pd =this.getPageData();
        String id =pd.getString("id");
		try {
			if(Tools.notEmpty(id)){
				return initService.sysCodeOne(id);
			}
			return initService.sysCodePage(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@RequestMapping(value="/propList",method=RequestMethod.GET)
	@ResponseBody
	public Object  propList(){
		PageData pd =this.getPageData();
		try {
			return initService.propList();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@RequestMapping(value="/entityList",method=RequestMethod.GET)
	@ResponseBody
	public Object  entityList(){
		//PageData pd =this.getPageData();
		try {
			return initService.entityList();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	@RequestMapping(value="/queryEnt",method=RequestMethod.GET)
	@ResponseBody
	public Object  queryEnt(){
		PageData pd =this.getPageData();
		try {
			return initService.queryEnt(pd.getString("ENTITYTYPE"));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	@RequestMapping(value="/entityPropList",method=RequestMethod.GET)
	@ResponseBody
	public Object  entityPropList(){
		PageData pd =this.getPageData();
		try {
			return initService.entityPropList(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@RequestMapping(value="/entPropEntry",method=RequestMethod.GET)
	@ResponseBody
	public Object  entPropEntry(){
		PageData pd =this.getPageData();
		try {
			return initService.entPropEntry(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	
	
	@RequestMapping(value="/sysCodeInfoList",method=RequestMethod.GET)
	@ResponseBody
	public Object sysCodeInfoList(){
		PageData pd =this.getPageData();
		try {
		return initService.sysCodeInfoList(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@RequestMapping(value="/addEntity" ,method=RequestMethod.POST)
	@ResponseBody
	public Object addEntity(){
		PageData pd =this.getPageData();
		Map<String, Object> map =new HashMap<String, Object>();
		Date caretedate=DateUtil.fomatDate(pd.getString("CREATEDATE"));
		Date invalidation=DateUtil.fomatDate(pd.getString("INVALIDATION"));
		pd.put("CREATEDATE", caretedate);
		pd.put("INVALIDATION", invalidation);
		try {
			initService.addEntity(pd);
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
	
	@RequestMapping(value="/modEntity",method=RequestMethod.POST)
	@ResponseBody
	public Object modEntity(){
		PageData pd =this.getPageData();
		Map<String, Object> map =new HashMap<String, Object>();
		Date caretedate=DateUtil.fomatDate(pd.getString("CREATEDATE"));
		Date invalidation=DateUtil.fomatDate(pd.getString("INVALIDATION"));
		pd.put("CREATEDATE", caretedate);
		pd.put("INVALIDATION", invalidation);
		try {
		initService.modEntity(pd);
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
	
	@RequestMapping(value="/addEntityProp" ,method=RequestMethod.POST)
	@ResponseBody
	public Object addEntityProp(){
		PageData pd =this.getPageData();
		Map<String, Object> map =new HashMap<String, Object>();
		try {
			initService.addEntityProp(pd);
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
	
	@RequestMapping(value="/modEntityProp" ,method=RequestMethod.POST)
	@ResponseBody
	public Object modEntityProp(){
		PageData pd =this.getPageData();
		Map<String, Object> map =new HashMap<String, Object>();
		try {
			initService.modEntityProp(pd);
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
	
	@RequestMapping(value="/addProp" ,method=RequestMethod.POST)
	@ResponseBody
	public Object addProp(){
		PageData pd =this.getPageData();
		Map<String, Object> map =new HashMap<String, Object>();
		try {
			initService.addProp(pd);
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
	
	@RequestMapping(value="/modProp",method=RequestMethod.POST)
	@ResponseBody
	public Object modProp(){
		PageData pd =this.getPageData();
		Map<String, Object> map =new HashMap<String, Object>();
		try {
		initService.modProp(pd);
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
	
	@RequestMapping(value="/addSysCode" ,method=RequestMethod.POST)
	@ResponseBody
	public Object addSysCode(){
		PageData pd =this.getPageData();
		Map<String, Object> map =new HashMap<String, Object>();
		try {
			initService.addSysCode(pd);
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
	
	
	@RequestMapping(value="/addSysCodeInfo",method=RequestMethod.POST)
	@ResponseBody
	public Object addSysCodeInfo(){
		PageData pd =this.getPageData();
		Map<String, Object> map =new HashMap<String, Object>();
		try {
		 initService.addSysCodeInfo(pd);
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
	
	@RequestMapping(value="/modSysCode",method=RequestMethod.POST)
	@ResponseBody
	public Object editSysCode(){
		PageData pd =this.getPageData();
		Map<String, Object> map =new HashMap<String, Object>();
		try {
		initService.modSysCode(pd);
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
	
	@RequestMapping(value="/modSysCodeInfo",method=RequestMethod.POST)
	@ResponseBody
	public Object editSysCodeInfo(){
		PageData pd =this.getPageData();
		Map<String, Object> map =new HashMap<String, Object>();
		try {
		initService.modSysCodeInfo(pd);
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
	
	
	@RequestMapping(value="/batchDelSysCode",method=RequestMethod.GET)
	@ResponseBody
	public Object  batchDelSysCode(){
			PageData pd  =this.getPageData();
			Map<String, Object> map =new HashMap<String, Object>();
	        String[] arrayIds=pd.getString("idList").split(",");
	        List<String> ids = Arrays.asList(arrayIds);
			try{
			initService.batchDelSysCode(ids);
			}catch(Exception e){
				e.printStackTrace();
				map.put("success", false);
				map.put("msg", "数据提交出现异常");
				return map;			
			}
			map.put("success", true);
			map.put("msg", "数据删除成功");
			return map;	
		
	}
	
	@RequestMapping(value="/batchDelSysCodeInfo",method=RequestMethod.GET)
	@ResponseBody
	public Object  batchDelSysCodeInfo(){
		PageData pd  =this.getPageData();
		Map<String, Object> map =new HashMap<String, Object>();
        String[] arrayIds=pd.getString("idList").split(",");
        List<String> ids = Arrays.asList(arrayIds);
		try{
		initService.batchDelSysCodeInfo(ids);
		}catch(Exception e){
			e.printStackTrace();
			map.put("success", false);
			map.put("msg", "数据提交出现异常");
			return map;			
		}
		map.put("success", true);
		map.put("msg", "数据删除成功");
		return map;	
	}
	//有效实体
	@RequestMapping(value = "/entValList" , method = RequestMethod.GET)
	@ResponseBody
	public Object entValList(){
		
		PageData pd =this.getPageData();
		try {
			return initService.entValList();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
}

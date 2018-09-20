package com.wsit.controller;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wsit.service.QuestService;
import com.wsit.utils.DateUtil;
import com.wsit.utils.PageData;
import com.wsit.utils.Tools;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;


@RequestMapping("/question")
@Controller
public class QuestionController extends BaseController{
	
	@Resource
	QuestService questService;
	
	@RequestMapping(value="/load",method=RequestMethod.GET)
	@ResponseBody
	public Object load(){
		PageData pd = this.getPageData();
		//String id =pd.getString("id");
		
		try {
		/*	if(Tools.notEmpty(id)){
				return questService.questOne(id);
			}*/
			return questService.questList(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	
	
	@RequestMapping(value="/batchEdit",method=RequestMethod.POST)
	@ResponseBody
	public void batchEdit(){
		  PageData pd = this.getPageData();	  
		  JSONArray json=null;	 
		  for (Object key : pd.keySet()) {
			  json=JSONArray.fromObject(key);		  
		}
		  List<PageData> list= (List<PageData>)JSONArray.toCollection(json, PageData.class);
		try {
			for (PageData pageData : list) {
				if(Tools.notEmpty(pageData.getString("DATE_"))){
					Date date_ =DateUtil.fomatDate(pageData.getString("DATE_"));
					pageData.put("DATE_", date_);
				}
				
				if(Tools.notEmpty(pageData.getString("INDATE"))){
					Date indate =DateUtil.fomatDate(pageData.getString("INDATE"));					
					pageData.put("INDATE", indate);
				}
				
				
				if((boolean) pageData.get("SHOWMARK")){
					pageData.put("SHOWMARK", "YES");
				}
			}
			questService.batchEdit(list);
		} catch (Exception e) {
	
			e.printStackTrace();
		}
	}
	
	
	
	@RequestMapping(value="/opTempLoad",method=RequestMethod.GET)
	@ResponseBody
	public Object opTempLoad(){
		try {
			return questService.opTempList();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}

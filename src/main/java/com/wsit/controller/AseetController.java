package com.wsit.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wsit.service.AseetService;
import com.wsit.utils.PageData;
import com.wsit.utils.Tools;
@RequestMapping("/aseet")
@Controller
public class AseetController extends BaseController {

	@Resource
	AseetService aseetService;
	
	@RequestMapping(value="/load",method=RequestMethod.GET)
	@ResponseBody
	public Object  load(){
		PageData pd =this.getPageData();
        String id =pd.getString("id");
		try {
			if(Tools.notEmpty(id)){
				return aseetService.aseetOne(id);
			}
			return aseetService.aseetPage(pd);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	
	
}

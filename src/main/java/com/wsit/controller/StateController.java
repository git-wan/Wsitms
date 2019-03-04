package com.wsit.controller;

import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentProducer;
import org.apache.http.entity.EntityTemplate;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wsit.service.StateService;
import com.wsit.utils.DateUtil;
import com.wsit.utils.PageData;
import com.wsit.utils.Tools;


@RequestMapping("/state")
@Controller
public class StateController extends BaseController{

	@Resource
	StateService   stateService;
	
	//ip列表
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
	
	
	//表空间数据库列表
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
	
	//db数据库列表
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
	//web列表
	@RequestMapping(value="/webPatorl",method=RequestMethod.GET)
	@ResponseBody
	public Object	 webPatorl() {
		PageData pd = this.getPageData();
		try {
		return	stateService.webPatorl(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	//ip状态查询
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
	
	//db状态查询
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
	//web状态查询
	@RequestMapping(value="/webStatus",method=RequestMethod.GET)
	@ResponseBody
	public Object webStatus() throws Exception{
		PageData pd = this.getPageData();
		return	stateService.webStatus(pd);
	}
	//表空间查询
	@RequestMapping(value="/queryTable",method=RequestMethod.GET)
	@ResponseBody
	public Object queryTable(){
		PageData pd =this.getPageData();
		try {
			return stateService.queryTable(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	//保存状态
	@RequestMapping(value="/addStatus" ,method=RequestMethod.POST)
	@ResponseBody
	public Object addStatus(){
		PageData pd =this.getPageData();
		Map<String, Object> map =new HashMap<String, Object>();
		try {
			stateService.addStatus(pd);
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
	//保存异常状态
	@RequestMapping(value="/addError" ,method=RequestMethod.POST)
	@ResponseBody
	public Object addError(){
		PageData pd =this.getPageData();
		Map<String, Object> map =new HashMap<String, Object>();
		try {
			stateService.addError(pd);
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
	
		
	@RequestMapping(value="/queryEntity",method=RequestMethod.GET)
	@ResponseBody
	public Object queryEntity(){
		
		Set<String> a = new HashSet<String>();
		List<PageData> list = new ArrayList<PageData>();
		try {			 
			List<String> s = stateService.queryEntity();
			for (String string : s) {
				a.add(string);
			}	
			for (String string : a) {
				PageData pd =new PageData();
				pd.put("name", string);
				pd.put("abbr", string);
				list.add(pd);
			}
			return list;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	//条件查询状态
	@RequestMapping(value="/queryStatus",method=RequestMethod.GET)
	@ResponseBody
	public Object queryStatus(){		
		PageData pd =this.getPageData();
		String STRATDATE = pd.get("STRATDATE").toString();
		String ENDDATE = pd.get("ENDDATE").toString();
		if(Tools.notEmpty(STRATDATE)){
			Date sdate =DateUtil.fomatDate(STRATDATE);
			pd.put("STRATDATE", sdate);
		}		
        if(Tools.notEmpty(ENDDATE)){
        	Date tdate=DateUtil.fomatDate(ENDDATE);
        	pd.put("ENDDATE", tdate);
		}		
		try {			 				
			return stateService.queryStatus(pd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/*@RequestMapping(value="/queryWeb",method=RequestMethod.POST)
	@ResponseBody
	public void  queryWeb(){		
		  HttpClient client = HttpClientBuilder.create().build();
		    HttpPost post = new HttpPost("http://localhost:8080/Wsitms");
		    try {
		        ContentProducer cp = new ContentProducer() {
		            public void writeTo(OutputStream outstream) throws IOException {
		                Writer writer = new OutputStreamWriter(outstream, "UTF-8");
		                writer.write("");
		                writer.flush();
		            }
		        };
		        post.setEntity(new EntityTemplate(cp));
		        HttpResponse response = client.execute(post);
		        System.out.println(EntityUtils.toString(response.getEntity()));
		    } catch (Exception e) {
		        e.printStackTrace();
		    } 
	}*/
	
}

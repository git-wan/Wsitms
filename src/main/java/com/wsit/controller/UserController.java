package com.wsit.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wsit.service.UserService;
import com.wsit.utils.DateUtil;
import com.wsit.utils.PageData;
import com.wsit.utils.Tools;

/**
 * @author wancheng
 *
 *         2018年8月9日上午8:59:34
 */
@RequestMapping("/user")
@Controller
public class UserController extends BaseController {
	@Resource
	UserService userService;

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	@ResponseBody
	public Object login(HttpServletRequest request) throws Exception {
		PageData pd = this.getPageData();
		Map<String, String> map = new HashMap<String, String>();
		Map<?, ?> user = userService.getUserInfo(pd);

		if (null != user && user.size() > 0) {
			request.getSession().setAttribute("user", user);
			map.put("success", "success");
		} else {
			map.put("failure", "failure");
			map.put("msg", "用户火密码不正确");
		}

		return map;

	}

	@RequestMapping(value = "/check_login", method = RequestMethod.GET)
	@ResponseBody
	public Object check_login(HttpServletRequest request) {
		// PageData pd=this.getPageData();

		// System.out.println(pd);
		Map<String, String> map = new HashMap<String, String>();
		map.put("failure", "failure");
		return map;

	}

	@RequestMapping(value = "/load", method = RequestMethod.GET)
	@ResponseBody
	public Object load() {
		PageData pd = this.getPageData();
		String id = pd.getString("id");
		try {
			if (Tools.notEmpty(id)) {
				return userService.userOne(id);
			}
			return userService.userPage(pd);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	@RequestMapping(value = "/userList", method = RequestMethod.GET)
	@ResponseBody
	public Object userList() {
		try {
			return userService.userList();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@RequestMapping(value = "/addUser", method = RequestMethod.POST)
	@ResponseBody
	public Object addUser() {
		PageData pd = this.getPageData();
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			pd.put("USER_ID", this.get32UUID());
			pd.put("FIRST_DATE", new Date());
			Date sdate = DateUtil.fomatDate(pd.get("VALID_SDATE").toString());
			Date tdate = DateUtil.fomatDate(pd.get("VALID_TDATE").toString());
			pd.put("VALID_SDATE", sdate);
			pd.put("VALID_TDATE", tdate);
			userService.addUser(pd);
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

	@RequestMapping(value = "ModUser", method = RequestMethod.POST)
	@ResponseBody
	public Object ModUser() {
		PageData pd = this.getPageData();
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			Date sdate = DateUtil.fomatDate(pd.get("VALID_SDATE").toString());
			Date tdate = DateUtil.fomatDate(pd.get("VALID_TDATE").toString());
			pd.put("VALID_SDATE", sdate);
			pd.put("VALID_TDATE", tdate);
			userService.modUser(pd);
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

	@RequestMapping(value = "editPass", method = RequestMethod.POST)
	@ResponseBody
	public Object editPass() {
		PageData pd = this.getPageData();
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			userService.editPass(pd);
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

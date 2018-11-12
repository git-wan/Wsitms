package com.wsit.service;

import java.util.List;

import com.wsit.utils.PageData;

/**
 * @author wancheng
 *
 * 2018年10月18日下午5:24:25
 */
public interface SaleReportService {
	
	public List<PageData>  sale(PageData pd)throws Exception;
	
	public void dutyInput(PageData pd)throws Exception;

}

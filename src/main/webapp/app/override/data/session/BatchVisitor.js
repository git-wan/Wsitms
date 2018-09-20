/**
 * 
 */
 
 Ext.define('Wsitms.override.data.session.BatchVisitor', {
    override: 'Ext.data.session.BatchVisitor',
    onDirtyRecord: function (record) {
    	if (record.erased) //如果记录已经标记为从服务器删除掉
    		return; //直接返回
        var me = this,
            operation = record.phantom ? 'create'
                : (record.dropped ? 'destroy' : 'update'),
            name = record.$className,
            map = (me.map || (me.map = {})),
            bucket = (map[name] || (map[name] = {
                entity: record.self
            }));
        bucket = bucket[operation] || (bucket[operation] = []);
        bucket.push(record);
    }
    
});